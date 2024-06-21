type Theme = 'system' | 'light' | 'dark';

interface Prepare {
	ACCESS_TOKEN: boolean;
	SECRET_KEY: boolean;
}

interface Creations {
	id: string;
	prompt: string;
	state: string;
	created_at: string;
	video: {
		url: string;
		width: number;
		height: number;
		thumbnail: string | null;
	} | null;
	liked: string | null;
	estimate_wait_seconds: string | null;
}

interface UploadFile {
	id: string;
	presigned_url: string;
	public_url: string;
}
