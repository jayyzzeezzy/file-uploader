const supabase = require('./supabase');
console.log("supabase: ", supabase);

exports.uploadToStorage = async (filePath, file) => {
    console.log("supabase storage: ", supabase.storage);
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, { upsert: true })
    return { data, error };
}

