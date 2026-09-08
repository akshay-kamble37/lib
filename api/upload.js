import { put } from '@vercel/blob';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/ogg',
]);

const MAX_FILE_SIZE = 80 * 1024 * 1024;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

function safeName(name = 'media') {
  return (
    name
      .toLowerCase()
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'media'
  );
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return json(
        {
          ok: false,
          error: 'Expected multipart/form-data',
        },
        400
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return json(
        {
          ok: false,
          error: 'No file selected',
        },
        400
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return json(
        {
          ok: false,
          error: `Unsupported media type: ${file.type}`,
        },
        415
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return json(
        {
          ok: false,
          error: 'File exceeds the 80 MB limit',
        },
        413
      );
    }

    const originalName = file.name || 'media';
    const baseName = safeName(originalName);

    const pathname = `library/${Date.now()}-${baseName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
    });

    return json(
      {
        ok: true,
        url: blob.url,
        pathname: blob.pathname,
        filename: originalName,
        type: file.type,
        size: file.size,
      },
      201
    );
  } catch (error) {
    console.error('UPLOAD_ERROR', error);

    return json(
      {
        ok: false,
        error: error?.message || 'Upload failed',
      },
      500
    );
  }
}