import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { request, RequestProps } from '@/request/web';

import { defaultGW } from '@/request/helper';
import { generateToken } from '@/upload/helper';

export interface UploadProps {
  filename?: string;
  file: ArrayBuffer | Blob | File | any;
  headers?: {
    [key: string]: string;
  };
  data?: {
    [key: string]: any;
  };
  config?: AxiosRequestConfig;
}

// Web 应用网关 上传
export const WebGWUpload: <T = any>(props: UploadProps) => Promise<T> = ({
  headers = {},
  data = {},
  filename = 'image',
  file = {},
  config = {},
}: UploadProps) => {
  return request({
    api: '',
    path: '/upload/image',
    query: {
      ...data,
      token: generateToken(),
      [filename]: file,
    },
    headers,
    ...config,
  });
};

// 微信小程序网关 上传
export const MiniGWUpload: <T = any>(props: UploadProps) => Promise<T> = ({
  headers = {},
  data = {},
  filename = 'image',
  file = {},
  config = {},
}: UploadProps) => new Promise((resolve, reject) => {});

// APP网关 上传
export const AppGWUpload: <T = any>(props: UploadProps) => Promise<T> = ({
  headers = {},
  data = {},
  filename = 'image',
  file = {},
  config = {},
}: UploadProps) => new Promise((resolve, reject) => {});
