//
//  File.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 18/01/2026.
//

import Foundation

struct UpdateNameModel: Encodable {
	let name: String
}

struct UpdateDescriptionModel: Encodable {
	let description: String
}

struct UpdateIsActiveModel: Encodable {
	let isActive: Bool
}

