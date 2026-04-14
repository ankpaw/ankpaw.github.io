import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toggleLike } from '../blog';
import { client, writeClient } from '@/lib/sanity/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const unsetMock = vi.fn().mockReturnThis();
const setIfMissingMock = vi.fn().mockReturnThis();
const appendMock = vi.fn().mockReturnThis();
const commitMock = vi.fn().mockResolvedValue({});

vi.mock('@/lib/sanity/client', () => {
  return {
    client: {
      fetch: vi.fn(),
    },
    writeClient: {
      patch: vi.fn().mockImplementation(() => ({
        unset: unsetMock,
        setIfMissing: setIfMissingMock,
        append: appendMock,
        commit: commitMock,
      })),
    },
  };
});

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('toggleLike', () => {
  const mockPostId = 'post-123';
  const mockSlug = 'test-post';
  const mockEmail = 'user@example.com';

  beforeEach(() => {
    vi.clearAllMocks();
    unsetMock.mockClear();
    setIfMissingMock.mockClear();
    appendMock.mockClear();
    commitMock.mockClear();
  });

  it('should return error if session is null', async () => {
    vi.mocked(auth).mockResolvedValue(null);

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: false, error: 'You must be signed in with a valid email to like a post.' });
    expect(client.fetch).not.toHaveBeenCalled();
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it('should return error if user has no email', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { name: 'Test User' }, expires: '' } as any);

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: false, error: 'You must be signed in with a valid email to like a post.' });
    expect(client.fetch).not.toHaveBeenCalled();
    expect(writeClient.patch).not.toHaveBeenCalled();
  });

  it('should handle missing likedBy field and add like', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: mockEmail }, expires: '' } as any);
    vi.mocked(client.fetch).mockResolvedValue(null);

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: true });
    expect(client.fetch).toHaveBeenCalledWith(`*[_id == $id][0]{ likedBy }`, { id: mockPostId });

    expect(writeClient.patch).toHaveBeenCalledWith(mockPostId);
    expect(setIfMissingMock).toHaveBeenCalledWith({ likedBy: [] });
    expect(appendMock).toHaveBeenCalledWith('likedBy', [mockEmail]);
    expect(commitMock).toHaveBeenCalled();

    expect(revalidatePath).toHaveBeenCalledWith(`/blog/${mockSlug}`);
    expect(revalidatePath).toHaveBeenCalledWith(`/blog`);
  });

  it('should add like if user has not liked the post', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: mockEmail }, expires: '' } as any);
    vi.mocked(client.fetch).mockResolvedValue({ likedBy: ['other@example.com'] });

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: true });
    expect(writeClient.patch).toHaveBeenCalledWith(mockPostId);
    expect(setIfMissingMock).toHaveBeenCalledWith({ likedBy: [] });
    expect(appendMock).toHaveBeenCalledWith('likedBy', [mockEmail]);
    expect(commitMock).toHaveBeenCalled();
  });

  it('should remove like if user has already liked the post', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: mockEmail }, expires: '' } as any);
    vi.mocked(client.fetch).mockResolvedValue({ likedBy: [mockEmail, 'other@example.com'] });

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: true });
    expect(writeClient.patch).toHaveBeenCalledWith(mockPostId);
    expect(unsetMock).toHaveBeenCalledWith([`likedBy[@ == ${JSON.stringify(mockEmail)}]`]);
    expect(commitMock).toHaveBeenCalled();
  });

  it('should return error if an exception is thrown', async () => {
    vi.mocked(auth).mockResolvedValue({ user: { email: mockEmail }, expires: '' } as any);
    vi.mocked(client.fetch).mockRejectedValue(new Error('Fetch failed'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await toggleLike(mockPostId, mockSlug);

    expect(result).toEqual({ success: false, error: 'Failed to toggle like' });
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
