//
//  UpdateServerPathViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 17/11/2025.
//

internal import Combine
import Foundation

class UpdateServerPathViewModel: ObservableObject {
	@Published var serverScheme: String = SettingsUD.serverScheme
	@Published var serverHost: String = SettingsUD.serverHost
	@Published var serverPort: String = String(SettingsUD.serverPort)
	@Published var isSaving: Bool = false
	@Published var errorMessage: String? = nil
	@Published var isErrorVisible: Bool = false

	init() {}

	func toggleIsSaving() {
		isSaving = !isSaving
	}

	func save() throws {
		if serverScheme != Constants.httpString
			&& serverScheme != Constants.httpsString
		{
			isErrorVisible = true
			errorMessage = String(localized: LocalizedStringResource.errorInvalidScheme)
			throw NSError(
				domain: "Invalid Scheme",
				code: 0,
				userInfo: nil
			)
		}
		if serverHost == "" {
			isErrorVisible = true
			errorMessage = String(localized: LocalizedStringResource.errorInvalidHost)
			throw NSError(domain: "Invalid Host", code: 0, userInfo: nil)
		}
		guard !serverPort.isEmpty, let port = Int(serverPort) else {
			isErrorVisible = true
			errorMessage = String(localized: LocalizedStringResource.errorInvalidPort)
			throw NSError(domain: "Invalid Port", code: 0, userInfo: nil)
		}
		if port < Constants.portMin || port > Constants.portMax {
			isErrorVisible = true
			errorMessage = String(localized: LocalizedStringResource.errorInvalidPort)
			throw NSError(domain: "Invalid Port", code: 0, userInfo: nil)
		}
		isErrorVisible = false
		errorMessage = nil
		SettingsUD.serverHost = serverHost
		SettingsUD.serverPort = port
		SettingsUD.serverScheme = serverScheme
	}

	func reset() {
		serverScheme = SettingsUD.serverScheme
		serverHost = SettingsUD.serverHost
		serverPort = String(SettingsUD.serverPort)
		isErrorVisible = false
		errorMessage = nil
	}

	func createServerFullPath() -> String {
		"\(serverScheme)://\(serverHost):\(serverPort)"
	}
}
