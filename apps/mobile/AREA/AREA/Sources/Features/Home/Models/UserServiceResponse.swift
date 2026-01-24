//
//  UserServiceResponse.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 24/01/2026.
//

import Foundation

struct UserServiceResponse: Decodable {
	let success: Bool
	let data: [UserServiceData?]
}

struct UserServiceData: Decodable {
	let id: String
	let serviceId: String
	let isConnected: Bool
	let lastSync: String?
	let createdAt: String
	let service: ServiceUserServiceData

	enum CodingKeys: String, CodingKey {
		case id
		case serviceId = "service_id"
		case isConnected = "is_connected"
		case lastSync = "last_sync"
		case createdAt = "created_at"
		case service
	}
}

struct ServiceUserServiceData: Decodable {
	let name: String
	let displayName: String
	let iconUrl: String

	enum CodingKeys: String, CodingKey {
		case name
		case displayName = "display_name"
		case iconUrl = "icon_url"
	}
}
