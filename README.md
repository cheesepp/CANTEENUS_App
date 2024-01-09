# Course: Introduction to Software Engineering, HCMUS
- This repository contains the final project: CanteenUS.

## Group18 members
- 21120542 - Lâm Hoàng Quốc - 21120542@student.hcmus.edu.vn
- 21120569 - Phạm Đình Tiến - 21120569@student.hcmus.edu.vn
- 21120572 - Trần Đình Nhật Trí - 21120572@student.hcmus.edu.vn
- 21120585 - Lê Anh Tú - 21120585@student.hcmus.edu.vn
- 21120588 - Nguyễn Phước Anh Tuấn - 21120588@student.hcmus.edu.vn

## Description
- This is an application allowing users to management canteen, order food on their Android smartphones.
- There are 3 roles for users: Admin, Staff, Customer.
- We split backend and mobile into two folders
## Features
- Chat realtime
- Managing user's profile
### Admin role:
- Managing the staff
- Managing the storage
- Managing the business target
- Managing the menu
- Calculating the profit of month or year
- Preview the bills of canteen
### Staff role:
- Order food
- Preview the bills of canteen
### User role:
- Order food
- Preview the bills of canteen
- Feedback the quality of food

## How to run app:
- The first, you need to install Visual Studio Code, MySQL Server - WorkBench and at least two Android Virtual Devices (AVDs)
- After running the AVD, you MUST change to folder 'backend', initial project with 'npm init -y', implement dependency in file '/backend/package.json', using command line 'npm i <module_name>'
- The next, open the second terminal, you change to folder 'mobile', initial project with 'npm init -y', implement dependency in file '/mobile/package.json', using command line 'npm i <module_name>'
- You should config MySQL connection like file 'backend/.env':
+ DB_HOST=127.0.0.1
+ DB_USER=root
+ DB_PASSWORD=123456
+ DB_NAME=canteenus
And you need to create a database name 'canteenus'
- Next, in the first terminal, run backend with command line 'npm start', it will auto create many necessary tables in database canteenus,
run the script in source folder to insert mock data
- Finally, in the second terminal, run mobile with command line 'npx react-native run-android', you completely run the app.
