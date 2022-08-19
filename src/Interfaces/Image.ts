interface IImage {
  data: File;
  preview: string;
}
export interface ImageUpdater {
  userId:string,
  image:string
}
export default IImage;
