//
//  RegisterRequest.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import Foundation

struct RegisterRequestPayload: Encodable {
	let name: String
	let email: String
	let password: String
}
