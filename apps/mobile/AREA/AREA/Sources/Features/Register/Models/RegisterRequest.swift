//
//  RegisterRequest.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 28/11/2025.
//

import Foundation

struct RegisterRequest: Encodable {
	let name: String
	let email: String
	let password: String
}
