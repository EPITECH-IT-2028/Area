//
//  ResetRequest.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

import Foundation

struct ResetRequest: Encodable {
	let email: String
	let newPassword: String
}
