---
title: API 文档
description: RESTFul 风格的 API 接口文档
---

<script>
  import Endpoint from '../lib/components/endpoints.svelte';
</script>

## 接口

<Endpoint title="列表" method="GET" description="返回所有生成列表">

```bash
/api/generations?offset=0&limit=10
```

<p></p>

```json
// 响应
{
	"data": [
		{
			"id": "eaf962b3-f279-4247-9d7d-c27c741e07cb",
			"prompt": "magic girl",
			"state": "completed",
			"created_at": "2024-06-20T06:02:26.278000Z",
			"video": {
				"url": "https://storage.cdn-luma.com/lit_lite_inference_im2vid_v1.0/7b95bfa3-553d-414d-86a0-2fdabbe033f5/watermarked_video02b0f2004112f449daa417adba5f80b75.mp4",
				"width": 512,
				"height": 512,
				"thumbnail": null
			},
			"liked": null,
			"estimate_wait_seconds": null
		}
	]
}
```

</Endpoint>

<Endpoint title="详情" method="GET" description="获取单个生成详情">

```bash
/api/generations/[id]
```

<p></p>

```json
// 响应
{
	"data": {
		"id": "eaf962b3-f279-4247-9d7d-c27c741e07cb",
		"prompt": "magic girl",
		"state": "completed",
		"created_at": "2024-06-20T06:02:26.278000Z",
		"video": {
			"url": "https://storage.cdn-luma.com/lit_lite_inference_im2vid_v1.0/7b95bfa3-553d-414d-86a0-2fdabbe033f5/watermarked_video02b0f2004112f449daa417adba5f80b75.mp4",
			"width": 512,
			"height": 512,
			"thumbnail": null
		},
		"liked": null,
		"estimate_wait_seconds": null
	}
}
```

</Endpoint>

<Endpoint title="用量" method="GET" description="获取可使用次数">

```bash
/api/generations/usage
```

<p></p>

```json
// 响应
{
	"data": {
		"consumed": 12,
		"capacity": 30,
		"available": 18,
		"subscription": {
			"active": false,
			"plan": "free",
			"type": null
		},
		"plans": [
			{
				"name": "Free",
				"key": "free",
				"capacity_per_month": 30,
				"monthly_cost_in_cents": 0,
				"yearly_cost_in_cents": 0
			},
			{
				"name": "Standard",
				"key": "standard",
				"capacity_per_month": 150,
				"monthly_cost_in_cents": 2999,
				"yearly_cost_in_cents": 28790.4
			},
			{
				"name": "Pro",
				"key": "pro",
				"capacity_per_month": 430,
				"monthly_cost_in_cents": 9999,
				"yearly_cost_in_cents": 95990.40000000001
			},
			{
				"name": "Premier",
				"key": "premier",
				"capacity_per_month": 2030,
				"monthly_cost_in_cents": 49999,
				"yearly_cost_in_cents": 479990.4
			}
		]
	}
}
```

</Endpoint>

<Endpoint title="生成" method="POST" description="生成列表">

```bash
/api/generations/create
```

<p></p>

```json
// 参数
{
	"prompt": "A kitten in motion",
	"image": "" // 可选，上传接口返回
}
```

</Endpoint>

<Endpoint title="上传图片" method="POST" description="上传图片并返回链接">

```bash
/api/generations/upload
```
<p></p>

```json
// 表单数据
file: (二进制)
```

<p></p>

```json
// 响应
{
	"data": {
		"id": "a2e55d82-a4fa-474c-95c8-9c43ad7cb304",
		"presigned_url": "https://dc53a917a6f427706a8ca3ecc7d70ea4.r2.cloudflarestorage.com/ai-lumalabs-storage/app_data/photon/user_uploads/3b700293-f1a7-4432-83f2-7e18e2f69b1f/a2e55d82-a4fa-474c-95c8-9c43ad7cb304_image_file.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=60bf44f30d45b472f9dd032de33e15d1%2F20240624%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240624T032938Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=1156531d48ec63f8444676fef9455faab9acd92d764caf1aa94e74e4d142130b",
		"public_url": "https://storage.cdn-luma.com/app_data/photon/user_uploads/3b700293-f1a7-4432-83f2-7e18e2f69b1f/a2e55d82-a4fa-474c-95c8-9c43ad7cb304_image_file.jpg"
	}
}
```

</Endpoint>
