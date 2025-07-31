const { supabase } = require('./supabase');

exports.uploadToStorage = async (filePath, file, fileType) => {
    console.log("supabase storage: ", supabase.storage);
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, { upsert: true, contentType: fileType })
    return { data, error };
}

