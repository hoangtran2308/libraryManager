import {Menu} from "../models/Menu";

export class Constant {
  public static readonly LIBRARY_STORAGE_KEY =  '3b354a25d9fa723326fd7e1a6d312515'
  public static readonly PAGE_INIT: number = 0
  public static readonly SIZE_INIT: number = 10
  public static readonly PAGE_LINK_SIZE = 3
  public static readonly NULL_VALUE = <any> null
  public static readonly REGEX_PASSWORD_FOR_VALIDATOR =  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"

  public static MENU : Menu[] = [
    {
      name: 'Tổng quan thông tin',
      icon: 'fa-solid fa-book-journal-whills',
      path: 'chart',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý thông tin sách',
      icon: 'fa-solid fa-list-check',
      path: 'book-manager',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý tác giả',
      icon: 'fa-solid fa-bars-progress',
        path: 'author-manager',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý tài khoản',
      icon: 'fa-solid fa-users',
      path: 'acc-manager',
      roles: ['admin']
    },
    {
      name: 'Quản lý nhân viên',
      icon: 'fa-solid fa-book-journal-whills',
      path: 'staff-manager',
      roles: ['admin']
    },
    {
      name: 'Quản lý thể loại sách',
      icon: 'fa-solid fa-business-time',
      path: 'category-manager',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý nhà xuất bản',
      icon: 'fa-solid fa-user-secret',
      path: 'publishing-company',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý mượn trả',
      icon: 'fa-solid fa-floppy-disk',
      path: 'loan-pay-manager',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý vi phạm',
      icon: 'fa-solid fa-fire',
      path: 'delinquent-manager',
      roles: ['admin', 'staff']
    },
    {
      name: 'Quản lý nhóm quyền',
      icon: 'fa-solid fa-user-group',
      path: 'role-manager',
      roles: ['admin']
    }
  ]
}
