//
//  LoginResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct LoginResponseData: Codable {
	var success: Bool
	var data: DataStruct?
	var message: String?
}

struct DataStruct: Codable {
	var access_token: String
	var user: User
}

struct User: Codable {
	var id: Int
	var email: String
}
