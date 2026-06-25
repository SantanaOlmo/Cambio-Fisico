import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PHOTOS_DIR } from './config';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PHOTOS_DIR),
  filename: (_req, file, cb) => {
    const date = new Date().toISOString().split('T')[0];
    const shortId = uuidv4().replace(/-/g, '').substring(0, 8);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `${date}-progreso-${shortId}${ext}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void => {
  const validExtensions = /\.(jpe?g|png|webp)$/i;
  const validMimeTypes = /^image\/(jpeg|png|webp)$/;

  if (validExtensions.test(file.originalname) && validMimeTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes: JPEG, PNG o WebP'));
  }
};

export const photoUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB máximo
});
