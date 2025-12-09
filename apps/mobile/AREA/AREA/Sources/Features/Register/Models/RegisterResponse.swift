//
//  RegisterResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import Foundation

struct RegisterResponsePayload: Decodable {
	var success: Bool?
	var data: RegisterResponseData?
	var message: String?
	var error: String?
}

struct RegisterResponseData: Decodable {
	var accessToken: String?
	var user: RegisterUserData?
}

struct RegisterUserData: Decodable {
	var id: String?
	var email: String?
	var name: String?
}
