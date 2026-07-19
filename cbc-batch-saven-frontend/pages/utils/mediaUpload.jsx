import { createClient } from "@supabase/supabase-js/dist/index.cjs";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlseHJteHBoZHFqc2ludnNydHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNDEyMzMsImV4cCI6MjA5OTkxNzIzM30._OKdnVaQcQMZHyZurFl-4Yg7-3x7x7_mBC0rf1oeJuY";
const superbaseUrl = "https://ylxrmxphdqjsinvsrtvq.supabase.co";

const superbase = createClient(superbaseUrl, anonKey);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name;
      superbase.storage
        .from("images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicUrl = superbase.storage
            .from("images")
            .getPublicUrl(fileName).data.publicUrl;
          resolve(publicUrl);
        })
        .catch(() => {
          reject("An error occured");
        });
    }
  });
}
