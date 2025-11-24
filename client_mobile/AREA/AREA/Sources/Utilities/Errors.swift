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
			return "Failed to load the data for the API configuration. Underlying error: \(error.localizedDescription)"
		case .decodingFailed(underlyingError: let error):
			return "Failed to decode the API configuration. Underlying error: \(error.localizedDescription)"
		}
	}
}

