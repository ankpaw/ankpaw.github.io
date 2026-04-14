import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitComment } from '@/app/actions/blog';
import { auth } from '@/lib/auth';
import { writeClient } from '@/lib/sanity/client';
import { revalidatePath } from 'next/cache';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/lib/sanity/client', () => ({
  writeClient: {
    create: vi.fn(),
  },
  client: {
    fetch: vi.fn(),
  }
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('submitComment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return error if user is not signed in', async () => {
    vi.mocked(auth).mockResolvedValue(null);

    const result = await submitComment('post-1', 'my-post', 'Hello world');

    expect(result).toEqual({ success: false, error: 'You must be signed in to comment.' });
    expect(writeClient.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('should successfully submit comment if user is signed in', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        image: 'https://example.com/avatar.jpg'
      },
      expires: '123'
    });

    vi.mocked(writeClient.create).mockResolvedValue({} as any);

    const result = await submitComment('post-1', 'my-post', 'Hello world');

    expect(result).toEqual({ success: true });
    expect(writeClient.create).toHaveBeenCalledWith({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: 'post-1',
      },
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://example.com/avatar.jpg',
      text: 'Hello world',
      published: false,
    });
    expect(revalidatePath).toHaveBeenCalledWith('/blog/my-post');
  });

  it('should use default values for missing user fields', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: {},
      expires: '123'
    });

    vi.mocked(writeClient.create).mockResolvedValue({} as any);

    const result = await submitComment('post-1', 'my-post', 'Hello world');

    expect(result).toEqual({ success: true });
    expect(writeClient.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Anonymous',
      email: '',
      image: '',
    }));
  });

  it('should return error if create fails', async () => {
    vi.mocked(auth).mockResolvedValue({
      user: {
        name: 'John Doe',
      },
      expires: '123'
    });

    vi.mocked(writeClient.create).mockRejectedValue(new Error('Sanity error'));

    // Suppress console.error in test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await submitComment('post-1', 'my-post', 'Hello world');

    expect(result).toEqual({ success: false, error: 'Failed to submit comment' });
    expect(revalidatePath).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
