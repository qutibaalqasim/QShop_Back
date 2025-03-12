import multer from 'multer';

export const fileValidation = {
    image:['image/png' , 'image/jpeg' , 'image/webp'],
    pdf:['application/pdf'],
    excel:['application/vnd. ms-excel for older . xls files and application/vnd. openxmlformats-officedocument'],
}

function fileUpload (customValidation = []){
    const storage = multer.diskStorage({});

    function fileFilter (req, file, cb){
        if(customValidation.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb("invalid format" , false);
        }
    }

    const upload = multer({fileFilter , storage});
    return upload;
}

export default fileUpload;