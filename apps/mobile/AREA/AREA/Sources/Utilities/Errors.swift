//
//  Errors.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 24/11/2025.
//

import Foundation

enum APIConfigError: Error, LocalizedError {
	case fileNotFound
	case dataLoadingFailed(underlyingError: Error)
	case decodingFailed(underlyingError: Error)

	var errorDescription: String? {
		switch self {
		case .fileNotFound:
			return "The file containing the API configuration was not found."
		case .dataLoadingFailed(underlyingError: let error):
			return
				"Failed to load the data for the API configuration. Underlying error: \(error.localizedDescription)"
		case .decodingFailed(underlyingError: let error):
			return
				"Failed to decode the API configuration. Underlying error: \(error.localizedDescription)"
		}
	}
}

enum NetworkError: Error, LocalizedError {
	case badURLResponse(underlyingError: Error)
	case missingConfig
	case urlBuildFailed
	case encodingFailed(underlyingError: Error)
	case decodingError(underlyingError: Error)

	var errorDescription: String? {
		switch self {
		case .badURLResponse(underlyingError: let error):
			return
				"The URL session returned an invalid response. Underlying error: \(error.localizedDescription)"
		case .encodingFailed(underlyingError: let error):
			return
				"Failed to encode the request body. Underlying error: \(error.localizedDescription)"
		case .decodingError(underlyingError: let error):
			return
				"Failed to decode the network response. Underlying error: \(error.localizedDescription)"
		case .missingConfig:
			return "The network request was missing the required API configuration."
		case .urlBuildFailed:
			return "Failed to build the URL for the network request."

		}
	}
}

enum LoginError: Error, LocalizedError {
	case invalidCredentials

	var errorDescription: String? {
		switch self {
		case .invalidCredentials:
			return "The provided credentials are invalid."
		}
	}
}
