import { UploadProps } from '../gateway';

// sts 前端上传的方法

// web应用前端 文件上传
export const WebSTSUpload: <T = any>(props: UploadProps) => Promise<T> = ({}) =>
  new Promise((resolve, reject) => {});

// 小程序前端 文件上传
export const MiniSTSUpload: <T = any>(
  props: UploadProps,
) => Promise<T> = ({}) => new Promise((resolve, reject) => {});

// APP前端  文件上传
export const AppSTSUpload: <T = any>(props: UploadProps) => Promise<T> = ({}) =>
  new Promise((resolve, reject) => {});
