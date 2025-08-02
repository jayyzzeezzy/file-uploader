const { supabase } = require('./supabase');

exports.uploadToStorage = async (fileName, file, fileType) => {
    // console.log("supabase storage: ", supabase.storage);
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file, { upsert: false, contentType: fileType })
    return { data, error };
}

exports.getPublicUrl = async (fileName) => {
    const { data } = await supabase.storage
        .from('uploads')
        .getPublicUrl(fileName, { download: true })
    return data;
}

exports.deleteFromStorage = async (fileName) => {
    const { data, error } = await supabase.storage
        .from('uploads')
        .remove([fileName])
    return { data, error };
}