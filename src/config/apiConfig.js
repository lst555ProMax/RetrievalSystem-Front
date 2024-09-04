// src/config/apiConfig.js
export const API_BASE_URL = "http://172.20.10.7:8000";
/* "http://192.168.156.89:8000" */

export const API_ENDPOINTS = {

/* -----已实现---------------------------------------------------------------- */
  login: `${API_BASE_URL}/user/login`, /* 用户登录 */ 
  register: `${API_BASE_URL}/user/register`, /* 用户注册 */
  resetPwd: `${API_BASE_URL}/user/reset_password`, /* 用户重置密码 */
  edit: `${API_BASE_URL}/user/edit`, /* 用户信息编辑 */
  feedback: `${API_BASE_URL}/user/feedback`, /* 提交反馈与建议 */
  delete: `${API_BASE_URL}/user/delete`, /* 账户注销 */

  text: `${API_BASE_URL}/search/text`, /* 文本检索 */
  image: `${API_BASE_URL}/search/image`, /* 图片检索 */

  delete_user: `${API_BASE_URL}/admin/delete_user`, /* 管理员删除用户账号 */
  edit_user_info: `${API_BASE_URL}/admin/edit_user_info`, /* 管理员更改用户信息 */
  get_user_info: `${API_BASE_URL}/admin/get_user_info`, /* 管理员获取用户数据 */


/* -----未实现----------------------------------------------------------------- */

  charge: `${API_BASE_URL}/user/charge`, /* 账户充值 */
  personal: `${API_BASE_URL}/user/personal`, /* 个性化界面设置 */
  history: `${API_BASE_URL}/user/history`, /* 检索历史 */
  sort: `${API_BASE_URL}/user/sort`, /* 检索结果排序 */
  download: `${API_BASE_URL}/user/download`, /* 下载图片 */

  get_user_balance: `${API_BASE_URL}/user/get_user_balance`, /* 获取用户余额 */
  set_user_balance: `${API_BASE_URL}/user/set_user_balance`, /* 更改用户余额 */
  record: `${API_BASE_URL}/search_history/record`, /* 记录检索历史 */
  result_record: `${API_BASE_URL}/search_history/result_record`, /* 记录检索历史组 */
  list: `${API_BASE_URL}/search_history/list`, /* 获取用户检索历史一组对话 */
  results: `${API_BASE_URL}/search_history/results`, /* 获取用户检索历史详情（全篇对话） */
  notify: `${API_BASE_URL}/alipay/notify`, /* 支付回调 */

  get_setting: `${API_BASE_URL}/admin/get_setting`,     /* 获取管理员备份设置 */
  set_setting:`${API_BASE_URL}/admin/set_setting`,      /* 更改管理员备份设置 */
  get_record: `${API_BASE_URL}/admin/get_record`,       /* 获取管理员备份记录 */
  create_backup:`${API_BASE_URL}/admin/create_backup`,  /* 管理员进行备份 */

   get_feedback_history: `${API_BASE_URL}/user/get_feedback_history`, /* 用户获取反馈记录 */
};
