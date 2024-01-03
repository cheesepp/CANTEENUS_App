const IPaddress = 'http://10.0.2.2:8080' // nào cần đổi IP thì đổi ở đây

// LƯU Ý: VỚI NHỮNG API ADD, DELETE, EDIT KHI DÙNG API Ở TRONG CODE PHẢI THÊM THAM
// SỐ ID Ở SAU ĐUÔI API
export const api = {
    register: IPaddress + '/auth/register',
    login: IPaddress + '/auth/login',
    signout: IPaddress + '/auth/signout',
    getStaffs: IPaddress + '/admin/get-staff',
    addStaff: IPaddress + '/admin/add-staff',
    editStaff: IPaddress + '/admin/edit-staff',
    deleteStaff: IPaddress + '/admin/delete-staff',
    getIngredients: IPaddress + '/admin/get-ingredient',
    addIngredient: IPaddress + '/admin/add-ingredient',
    editIngredient: IPaddress + '/admin/edit-ingredient',
    deleteIngredient: IPaddress + '/admin/delete-ingredient',
    getItems: IPaddress + '/admin/get-item',
    addItem: IPaddress + '/admin/add-item',
    deleteItem: IPaddress + '/admin/delete-item',
    getBills: IPaddress + '/bill/get-bill',
    addBill: IPaddress + '/bill/add-bill',
    editBill: IPaddress + '/bill/edit-bill',
    deleteBill: IPaddress + '/bill/delete-bill',
    getTargets: IPaddress + '/admin/get-target',
    addTarget: IPaddress + '/admin/add-target',
    getProfitOfaYear: IPaddress + '/admin/get-profit-of-a-year',
    getProfitByMonth: IPaddress + '/admin/get-profit-by-month',
    getProfitByYear: IPaddress + '/admin/get-profit-by-year',
    getYears: IPaddress + '/admin/get-years',
}