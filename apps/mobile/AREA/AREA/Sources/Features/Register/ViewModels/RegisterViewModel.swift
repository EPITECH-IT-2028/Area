//
//  RegisterViewModel.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 20/11/2025.
//

internal import Combine
import Foundation
import SimpleKeychain
import SwiftUI

class RegisterViewModel: ObservableObject {
	@Published var name: String = ""
	@Published var email: String = ""
	@Published var password: String = ""
	@Published var confirmPassword: String = ""
	@Published var isRegister: Bool = false
	@Published var emailValid: Bool = true
	@Published var passwordValid: Bool = true
	@Published var confirmPasswordValid: Bool = true
	@Published var errorMessage: String?
	@Published var status: RegisterStatus = .success

	enum RegisterStatus {
		case success
		case failure
	}

	init(email: String = "", password: String = "", name: String = "") {
		self.name = name
		self.email = email
		self.password = password
		self.confirmPassword = password
		self.isRegister = false
		self.errorMessage = nil
		self.emailValid = true
	}

	@MainActor
	func register() async throws {
		passwordValid = true
		confirmPasswordValid = true
		emailValid = true
		errorMessage = nil
		status = .success

		let isPasswordValid: String? = validatePassword(password)

		if isPasswordValid != nil {
			errorMessage = isPasswordValid
			passwordValid = false
			status = .failure
			return
		}

		if password != confirmPassword {
			errorMessage = String(
				localized: LocalizedStringResource.registerPasswordDoNotMatch
			)
			passwordValid = false
			confirmPasswordValid = false
			status = .failure
			return
		}

		if !textFieldValidatorEmail(email) {
			errorMessage = String(
				localized: LocalizedStringResource.registerEmailNotValid
			)
			emailValid = false
			status = .failure
			return
		}

		// TO DO: CHECK IF USER ALREADY EXISTS TO DISPLAY BETTER ERROR

		var response: RegisterResponsePayload

		do {
			response = try await RegisterAction(
				parameters: RegisterRequestPayload(
					name: name,
					email: email,
					password: password
				)
			).call()
		} catch let error as NetworkError {
			switch error {
			case .badURLResponse(let underlyingError):
				print("Underlying error: \(underlyingError)")
				errorMessage =
					"Bad URL Response: \(underlyingError.localizedDescription)"
				status = .failure
			case .decodingError(let underlyingError):
				print("Underlying error: \(underlyingError)")
				errorMessage = "Decoding issue: \(underlyingError.localizedDescription)"
				status = .failure
			default:
				errorMessage = error.localizedDescription
				status = .failure
			}
			throw error
		} catch {
			errorMessage = error.localizedDescription
			status = .failure
			throw error
		}

		guard let data = response.data else {
			status = .failure
			throw NetworkError.missingResponseData
		}

		guard let accessToken = data.accessToken else {
			status = .failure
			throw NetworkError.missingAccessToken
		}

		do {
			try AuthState.shared.authenticate(accessToken: accessToken)
			isRegister = true
			status = .success
			errorMessage = nil
			name = ""
			email = ""
			password = ""
			confirmPassword = ""
		} catch {
			print("Keychain error: \(error.localizedDescription)")
		}
	}

	/// This function is used to validate the format of the email
	func textFieldValidatorEmail(_ string: String) -> Bool {
		if string.count > 100 {
			return false
		}
		let emailFormat =
			"(?:[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}~-]+(?:\\.[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}"
			+ "~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\"
			+ "x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[\\p{L}0-9](?:[a-"
			+ "z0-9-]*[\\p{L}0-9])?\\.)+[\\p{L}0-9](?:[\\p{L}0-9-]*[\\p{L}0-9])?|\\[(?:(?:25[0-5"
			+ "]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-"
			+ "9][0-9]?|[\\p{L}0-9-]*[\\p{L}0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21"
			+ "-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
		let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailFormat)
		return emailPredicate.evaluate(with: string)
	}

	/// This function returns an error message when the user has not a strong password
	func validatePassword(_ password: String) -> String? {
		if password.count < 8 {
			return String(localized: LocalizedStringResource.registerPasswordTooShort)
		}

		let lowercaseRegex = ".*[a-z].*"
		if password.range(of: lowercaseRegex, options: .regularExpression) == nil {
			return String(localized: LocalizedStringResource.registerPasswordNoLowers)
		}

		let uppercaseRegex = ".*[A-Z].*"
		if password.range(of: uppercaseRegex, options: .regularExpression) == nil {
			return String(localized: LocalizedStringResource.registerPasswordNoCaps)
		}

		let digitRegex = ".*\\d.*"
		if password.range(of: digitRegex, options: .regularExpression) == nil {
			return String(localized: LocalizedStringResource.registerPasswordNoNumber)
		}

		let specialCharRegex = ".*[^A-Za-z0-9].*"
		if password.range(of: specialCharRegex, options: .regularExpression) == nil
		{
			return String(
				localized: LocalizedStringResource.registerPasswordNoSpecialChar
			)
		}

		return nil
	}

}
