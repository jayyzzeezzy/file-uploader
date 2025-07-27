const supabase = require('./supabase');

exports.uploadToStorage = async (filePath, file) => {
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, { upsert: true })
    return { data, error };
}

