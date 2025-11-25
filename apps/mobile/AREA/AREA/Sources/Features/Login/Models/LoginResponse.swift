//
//  LoginResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

import Foundation

struct LoginResponseData: Codable {
	var accessToken: String
	var data: UserData?
}

struct UserData: Codable {
	var id: Int?
	var email: String?
	var name: String?
}
