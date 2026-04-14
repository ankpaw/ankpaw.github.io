import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toggleLike } from '@/app/actions/blog';
import { client, writeClient } from '@/lib/sanity/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

vi.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: vi.fn(),
  },
  writeClient: {
    patch: vi.fn(),
  },
}));

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('toggleLike', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return error if user is not signed in', async () => {
    vi.mocked(auth).mockResolvedValue(null);

    const result = await toggleLike('post-1', 'post-slug');

    expect(result).toEqual({ success: false, error: 'You must be signed in with a valid email to like a post.' });
    expect(client.fetch).not.toHaveBeenCalled();
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it('should return error if user does not have an email', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { name: 'Test User' }, expires: '1' } as any);

    const result = await toggleLike('post-1', 'post-slug');

    expect(result).toEqual({ success: false, error: 'You must be signed in with a valid email to like a post.' });
    expect(client.fetch).not.toHaveBeenCalled();
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it('should like a post if not previously liked', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: 'test@example.com' }, expires: '1' } as any);
    vi.mocked(client.fetch).mockResolvedValue({ likedBy: [] });

    const commitMock = vi.fn().mockResolvedValue(true);
    const appendMock = vi.fn().mockReturnValue({ commit: commitMock });
    const setIfMissingMock = vi.fn().mockReturnValue({ append: appendMock });
    const patchMock = vi.fn().mockReturnValue({ setIfMissing: setIfMissingMock });

    vi.mocked(writeClient.patch).mockImplementation(patchMock as any);

    const result = await toggleLike('post-1', 'post-slug');

    expect(client.fetch).toHaveBeenCalledWith('*[_id == $id][0]{ likedBy }', { id: 'post-1' });
    expect(patchMock).toHaveBeenCalledWith('post-1');
    expect(setIfMissingMock).toHaveBeenCalledWith({ likedBy: [] });
    expect(appendMock).toHaveBeenCalledWith('likedBy', ['test@example.com']);
    expect(commitMock).toHaveBeenCalled();

    expect(revalidatePath).toHaveBeenCalledWith('/blog/post-slug');
    expect(revalidatePath).toHaveBeenCalledWith('/blog');

    expect(result).toEqual({ success: true });
  });

  it('should unlike a post if previously liked', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: 'test@example.com' }, expires: '1' } as any);
    vi.mocked(client.fetch).mockResolvedValue({ likedBy: ['test@example.com', 'other@example.com'] });

    const commitMock = vi.fn().mockResolvedValue(true);
    const unsetMock = vi.fn().mockReturnValue({ commit: commitMock });
    const patchMock = vi.fn().mockReturnValue({ unset: unsetMock });

    vi.mocked(writeClient.patch).mockImplementation(patchMock as any);

    const result = await toggleLike('post-1', 'post-slug');

    expect(client.fetch).toHaveBeenCalledWith('*[_id == $id][0]{ likedBy }', { id: 'post-1' });
    expect(patchMock).toHaveBeenCalledWith('post-1');
    expect(unsetMock).toHaveBeenCalledWith([`likedBy[@ == "test@example.com"]`]);
    expect(commitMock).toHaveBeenCalled();

    expect(revalidatePath).toHaveBeenCalledWith('/blog/post-slug');
    expect(revalidatePath).toHaveBeenCalledWith('/blog');

    expect(result).toEqual({ success: true });
  });

  it('should return error if an exception occurs', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: 'test@example.com' }, expires: '1' } as any);
    vi.mocked(client.fetch).mockRejectedValue(new Error('Database error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await toggleLike('post-1', 'post-slug');

    expect(result).toEqual({ success: false, error: 'Failed to toggle like' });
    expect(consoleSpy).toHaveBeenCalledWith('Failed to toggle like', expect.any(Error));

    consoleSpy.mockRestore();
  });
});
