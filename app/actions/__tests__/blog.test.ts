import { deleteComment } from '../blog';
import { client, writeClient } from '@/lib/sanity/client';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// Mock dependencies
jest.mock('@/lib/sanity/client', () => ({
  client: {
    fetch: jest.fn(),
  },
  writeClient: {
    delete: jest.fn(),
  },
}));

jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('deleteComment', () => {
  const mockCommentId = 'comment-123';
  const mockSlug = 'test-post';
  const mockEmail = 'test@example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error if user is not signed in', async () => {
    (auth as jest.Mock).mockResolvedValueOnce(null);

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: false, error: 'You must be signed in.' });
    expect(auth).toHaveBeenCalled();
    expect(client.fetch).not.toHaveBeenCalled();
  });

  it('returns error if user email is missing', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: { name: 'Test User' } });

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: false, error: 'You must be signed in.' });
  });

  it('returns error if comment is not found', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: { email: mockEmail } });
    (client.fetch as jest.Mock).mockResolvedValueOnce(null);

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: false, error: 'Unauthorized to delete this comment.' });
    expect(client.fetch).toHaveBeenCalledWith(`*[_id == $id][0]{ email }`, { id: mockCommentId });
    expect(writeClient.delete).not.toHaveBeenCalled();
  });

  it('returns error if user is not authorized to delete the comment', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: { email: mockEmail } });
    (client.fetch as jest.Mock).mockResolvedValueOnce({ email: 'other@example.com' });

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: false, error: 'Unauthorized to delete this comment.' });
    expect(writeClient.delete).not.toHaveBeenCalled();
  });

  it('deletes comment successfully and revalidates path', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: { email: mockEmail } });
    (client.fetch as jest.Mock).mockResolvedValueOnce({ email: mockEmail });
    (writeClient.delete as jest.Mock).mockResolvedValueOnce({});

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: true });
    expect(writeClient.delete).toHaveBeenCalledWith(mockCommentId);
    expect(revalidatePath).toHaveBeenCalledWith(`/blog/${mockSlug}`);
  });

  it('returns error if sanity delete operation fails', async () => {
    (auth as jest.Mock).mockResolvedValueOnce({ user: { email: mockEmail } });
    (client.fetch as jest.Mock).mockResolvedValueOnce({ email: mockEmail });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Sanity delete failed');
    (writeClient.delete as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await deleteComment(mockCommentId, mockSlug);

    expect(result).toEqual({ success: false, error: 'Failed to delete comment' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to delete comment', mockError);

    consoleErrorSpy.mockRestore();
  });
});
