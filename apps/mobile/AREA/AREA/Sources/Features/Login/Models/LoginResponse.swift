//
//  LoginResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct LoginResponseData: Decodable {
	var success: Bool?
	var data: DataLoginResponse?
	var message: String?
}

struct DataLoginResponse: Decodable {
	var accessToken: String?
	var user: UserData?
}

struct UserData: Decodable {
	var id: String?
	var email: String?
	var name: String?
}
