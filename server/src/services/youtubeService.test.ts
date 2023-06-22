import fetch, { Response } from 'node-fetch';
import { YoutubeService } from './youtubeService';

jest.mock('node-fetch');

describe('youtubeService', () => {
  const youtubeService = new YoutubeService();

  it('should return video information for a valid YouTube URL', async () => {
    const validYoutubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const mockApiResponse = {
      items: [
        {
          snippet: {
            title: 'Sample Video Title',
            description: 'Sample video description',
          },
        },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      json: async () => mockApiResponse,
    } as Response);

    const videoInfo = await youtubeService.getVideoInfo(validYoutubeUrl);

    expect(videoInfo).toEqual({
      videoId: 'dQw4w9WgXcQ',
      title: 'Sample Video Title',
      description: 'Sample video description',
    });
  });

  it('should throw an error for an invalid YouTube URL', async () => {
    const invalidYoutubeUrl = 'https://invalid-url.com';

    await expect(
      youtubeService.getVideoInfo(invalidYoutubeUrl)
    ).rejects.toThrow('Invalid YouTube URL');
  });

  it('should handle errors in the API response', async () => {
    const validYoutubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('API request error')
    );

    await expect(youtubeService.getVideoInfo(validYoutubeUrl)).rejects.toThrow(
      'API request error'
    );
  });
});
