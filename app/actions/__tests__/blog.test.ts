import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteComment } from '../blog';
import { client, writeClient } from '@/lib/sanity/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
  writeClient: {
    delete: vi.fn(),
  },
}));

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('deleteComment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an error if user is not signed in', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null);

    const result = await deleteComment('comment-id', 'test-slug');

    expect(result).toEqual({ success: false, error: 'You must be signed in.' });
    expect(auth).toHaveBeenCalled();
    expect(client.fetch).not.toHaveBeenCalled();
    expect(writeClient.delete).not.toHaveBeenCalled();
  });

  it('should return an error if user email does not match comment email', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { email: 'user@example.com' },
      expires: '123'
    });
    vi.mocked(client.fetch).mockResolvedValueOnce({ email: 'other@example.com' });

    const result = await deleteComment('comment-id', 'test-slug');

    expect(result).toEqual({ success: false, error: 'Unauthorized to delete this comment.' });
    expect(client.fetch).toHaveBeenCalledWith(`*[_id == $id][0]{ email }`, { id: 'comment-id' });
    expect(writeClient.delete).not.toHaveBeenCalled();
  });

  it('should return an error if comment is not found', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { email: 'user@example.com' },
      expires: '123'
    });
    vi.mocked(client.fetch).mockResolvedValueOnce(null);

    const result = await deleteComment('comment-id', 'test-slug');

    expect(result).toEqual({ success: false, error: 'Unauthorized to delete this comment.' });
    expect(client.fetch).toHaveBeenCalledWith(`*[_id == $id][0]{ email }`, { id: 'comment-id' });
    expect(writeClient.delete).not.toHaveBeenCalled();
  });

  it('should successfully delete comment when user is authorized', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { email: 'user@example.com' },
      expires: '123'
    });
    vi.mocked(client.fetch).mockResolvedValueOnce({ email: 'user@example.com' });
    vi.mocked(writeClient.delete).mockResolvedValueOnce({} as any);

    const result = await deleteComment('comment-id', 'test-slug');

    expect(result).toEqual({ success: true });
    expect(client.fetch).toHaveBeenCalledWith(`*[_id == $id][0]{ email }`, { id: 'comment-id' });
    expect(writeClient.delete).toHaveBeenCalledWith('comment-id');
    expect(revalidatePath).toHaveBeenCalledWith('/blog/test-slug');
  });

  it('should return an error if deleting fails', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { email: 'user@example.com' },
      expires: '123'
    });
    vi.mocked(client.fetch).mockResolvedValueOnce({ email: 'user@example.com' });
    vi.mocked(writeClient.delete).mockRejectedValueOnce(new Error('Sanity error'));

    // Silence console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await deleteComment('comment-id', 'test-slug');

    expect(result).toEqual({ success: false, error: 'Failed to delete comment' });
    expect(writeClient.delete).toHaveBeenCalledWith('comment-id');
    expect(revalidatePath).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
