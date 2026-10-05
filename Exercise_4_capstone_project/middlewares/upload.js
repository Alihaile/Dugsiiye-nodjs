import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from '../util/cloudinary.js';

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'my_uploads',
        allowedFormats: ['jpg', 'jpeg', 'png', 'pdf'],
    }

    // transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});


export default upload;