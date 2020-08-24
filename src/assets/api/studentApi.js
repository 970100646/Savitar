import request from "@/utils/request";

export function page(params) {
  return request({
    url: "/student/page",
    method: "post",
    data: params
  });
}
