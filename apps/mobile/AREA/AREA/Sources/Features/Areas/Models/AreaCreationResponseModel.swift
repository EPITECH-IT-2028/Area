//
//  AreaCreationResponseModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 14/01/2026.
//

import Foundation

struct AreaCreationResponse: Decodable {
	let success: Bool
	let data: AreaCreationData?
	let message: String
	let statusCode: Int?

	enum CodingKeys: String, CodingKey {
		case success
		case data
		case message
		case statusCode = "status_code"
	}
}

struct AreaCreationData: Decodable {
	let id: String
	let name: String
	let isActive: Bool
	let createdAt: Date

	enum CodingKeys: String, CodingKey {
		case id
		case name
		case isActive = "is_active"
		case createdAt = "created_at"
	}
}

struct AreaCreationErrorResponse: Decodable {
	let message: String
	let statusCode: Int?
	let error: String?

	enum CodingKeys: String, CodingKey {
		case message
		case statusCode = "status_code"
		case error
	}
}

enum AreaCreationResult {
	case success(AreaCreationResponse)
	case failure(error: String, statusCode: Int)

	var isSuccess: Bool {
		if case .success = self {
			return true
		}
		return false
	}

	var errorMessage: String? {
		if case .failure(let error, _) = self {
			return error
		}
		return nil
	}
}
