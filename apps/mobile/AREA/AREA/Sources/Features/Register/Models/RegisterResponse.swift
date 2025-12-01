//
//  RegisterResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import Foundation

struct RegisterResponseData: Decodable {
	var success: Bool?
	var data: DataRegisterResponse?
	var message: String?
	var error: String?
}

struct DataRegisterResponse: Decodable {
	var accessToken: String?
	var user: UserRegisterData?
}

struct UserRegisterData: Decodable {
	var id: String?
	var email: String?
	var name: String?
}
