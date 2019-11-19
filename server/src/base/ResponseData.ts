export class ResponseData {
  public success: boolean;
  public code: string;
  public message: string;
  public data: any;

  constructor (success: boolean, code: string, message: string, data: any) {
    this.success = success
    this.code = code
    this.message = message
    this.data = data
  }
}
