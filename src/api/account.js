import request from './request'
import URL from './config'

/**
 * 获取Account列表
 * @param {Number} companyId // 当前公司 ID
 */
export const getAccountList = (companyId) => {
  return request({
    method: 'get',
    url: `${URL.getAccountList}/${companyId}/accounts`,
  })
}

/**
 * 新增 Account
 * @param {Number} companyId 公司id
 * @param {Object} data      Account 数据，例如
   {
      "no": "10011.01",
      "name": "122",
      "type_name": "库存现金",
      "type_no": "1001",
      "is_active": false
   }
 */
export const addAccount = (companyId, data) => {
  return request({
    method: 'post',
    url: `${URL.addAccount}/${companyId}/accounts`,
    data
  })
}

/**
 * 更新Account
 * @param {Number} companyId 公司id
 * @param {String} no        Account no  
 * @param {Obejct} data      Account 数据，例如：
{
    "no": "10011.022",
    "name": "12256",
    "type_name": "库存现金",
    "type_no": "1001",
    "is_active": true
}
 */
export const updateAccount = (companyId, data) => {
  return request({
    method: 'patch',
    url: `${URL.getAccountList}/${companyId}/accounts`,
    params: {
      no: data.no
    },
    data
  })
}

/**
 * 根据用户选择的语言，获取所有的 AccountType
 * @param {String} region 当前选择的 语言 Account Type
 */
export const getAccountType = (region) => {
  return request({
    method: 'get',
    url: URL.getAccountType,
    params: {
      region
    }
  })
}
