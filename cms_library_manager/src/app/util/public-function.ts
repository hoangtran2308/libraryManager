import {HttpParams} from "@angular/common/http";

export function generateParams(params: Object): HttpParams{
  /**
   * Dùng để tạo các params khi sử dụng phương thức get với nhiều trường thông tin yêu cầu
   * @returns Một đối tượng HttpParams
   * @param param  đối tượng chứa thông tin yêu cầu (request)
   * */
  let paramsResult =  new HttpParams()
  Object.keys(params).forEach(
    (keys) => {
      // @ts-ignore
      let variable = params[keys]
      if(variable != null || variable != undefined){
        paramsResult = paramsResult.append(keys, variable)
      }
    }
  )
  return paramsResult
}
