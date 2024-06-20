export const mockCreations: Creations[] = [
	{
		id: 'f5bc5441-346b-456a-a199-ea670cef0af8',
		prompt: 'A Chinese girl wearing a Hanfu under a peach blossom tree.',
		state: 'completed',
		created_at: '2024-06-13T05:35:15.418000Z',
		video: {
			url: 'https://storage.cdn-luma.com/lit_lite_inference_text2vid_v1.0/3ee50192-314d-42ee-b522-de570555fc7f/watermarked_video0ad22cf43fd594223a1852fd16b144305.mp4',
			width: 512,
			height: 512,
			thumbnail: null
		},
		liked: null,
		estimate_wait_seconds: null
	}
];

export const mockUploadFile: UploadFile = {
	id: 'f1195d36-3e68-4b77-a12c-26e8245ffce6',
	presigned_url:
		'https://dc53a917a6f427706a8ca3ecc7d70ea4.r2.cloudflarestorage.com/ai-lumalabs-storage/app_data/photon/user_uploads/3b700293-f1a7-4432-83f2-7e18e2f69b1f/f1195d36-3e68-4b77-a12c-26e8245ffce6_image_file.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=60bf44f30d45b472f9dd032de33e15d1%2F20240620%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240620T020308Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=68384d641513f10c281a6cdac51b03d514586b0fcf4cf027fdacb85ccbd50865',
	public_url:
		'https://storage.cdn-luma.com/app_data/photon/user_uploads/3b700293-f1a7-4432-83f2-7e18e2f69b1f/f1195d36-3e68-4b77-a12c-26e8245ffce6_image_file.jpg'
};
