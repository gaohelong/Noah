### 异步请求优化 - 拼接url、参数、fetch配置等
```javascript
const API_ROOT = 'http://192.168.1.1:7800';
const API_HOST = 'http://127.0.0.1:8088'

// 获取所有的加速域名
export function fetchDomainList() {
  return request(`${API_HOST}/dashboard/v1/domains`);
}

// 获取地图数据
export function fetchMapQualityByIsp(domain, isp) {
 return request(`${API_HOST}/dashboard/v1/domain/${domain}/quality?isp=${isp}`);
}

export function getHostDetailApi(host_id) {
  return request(`${API_ROOT}/host/${host_id}`);
}

export function editHostListApi(body) {
  return request(`${API_ROOT}/host`, {
    method: 'POST',
    body: body
  });
}
```
