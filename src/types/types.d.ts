interface Creations {
	id: string;
	prompt: string;
	state: string;
	created_at: string;
	video: Video | null;
	liked: string | null;
	estimate_wait_seconds: string | null;
}

interface Video {
	url: string;
	width: number;
	height: number;
	thumbnail: string | null;
}

interface UploadFile {
	id: string;
	presigned_url: string;
	public_url: string;
}
