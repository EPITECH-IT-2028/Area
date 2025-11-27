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
			errorMessage = "\(LocalizedStringResource.errorInvalidScheme)"
			throw NSError(
				domain: "\(LocalizedStringResource.errorInvalidScheme)",
				code: 0,
				userInfo: nil
			)
		}
		if serverHost == "" {
			isErrorVisible = true
			errorMessage = "\(LocalizedStringResource.errorInvalidHost)"
			throw NSError(domain: "\(LocalizedStringResource.errorInvalidHost)", code: 0, userInfo: nil)
		}
		guard !serverPort.isEmpty, let port = Int(serverPort) else {
			isErrorVisible = true
			errorMessage = "\(LocalizedStringResource.errorInvalidPort)"
			throw NSError(domain: "\(LocalizedStringResource.errorInvalidPort)", code: 0, userInfo: nil)
		}
		if port < Constants.portMin || port > Constants.portMax {
			isErrorVisible = true
			errorMessage = "\(LocalizedStringResource.errorInvalidPort)"
			throw NSError(domain: "\(LocalizedStringResource.errorInvalidPort)", code: 0, userInfo: nil)
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
