import { Asset } from "expo-asset";

/*
expo-audio necesita la URI local del archivo de audio para reproducirlo.
Esta función toma un módulo (archivo de audio importado) y devuelve su URI local.

Si el archivo no se ha descargado aún, la función lo descarga primero.
*/

export async function getUri(module: any): Promise<string> {
  const asset = Asset.fromModule(module);

  if (!asset.downloaded) {
    try {
      await asset.downloadAsync();
      console.log("[URI] Asset downloaded:", asset.uri);
    } catch (err) {
      console.error("[URI] Error downloading asset:", err);
    }
  }
  const uri = asset.localUri ?? asset.uri;
  if (!uri) {
    throw new Error("[URI] Unable to get URI for the provided module.");
  }
  return uri;
}
