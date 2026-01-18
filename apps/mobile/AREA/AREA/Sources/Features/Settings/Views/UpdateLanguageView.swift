//
//  UpdateLanguageView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 18/01/2026.
//

import SimpleKeychain
import SwiftUI

struct UpdateLanguageView: View {
	@AppStorage("language") private var languageString = "fr"
	@State private var previousLanguage = ""

	var body: some View {
		List {
			Section {
				LanguageOptionRow(
					language: "Français",
					flag: Constants.flagFr,
					code: Constants.languageFrCode,
					isSelected: languageString == Constants.languageFrCode
				)
				.contentShape(Rectangle())
				.onTapGesture {
					selectLanguage(Constants.languageFrCode)
				}

				LanguageOptionRow(
					language: "English",
					flag: Constants.flagEn,
					code: Constants.languageEnCode,
					isSelected: languageString == Constants.languageEnCode
				)
				.contentShape(Rectangle())
				.onTapGesture {
					selectLanguage(Constants.languageEnCode)
				}
			} header: {
				Text(LocalizedStringResource.settingsLanguageAvailable)
			}
		}
		.navigationTitle(LocalizedStringResource.settingsLanguageLanguageSettings)
		.navigationBarTitleDisplayMode(.inline)
		.onAppear {
			previousLanguage = languageString
		}
	}

	private func selectLanguage(_ code: String) {
		guard code != languageString else { return }
		previousLanguage = languageString
		languageString = code
	}
}

struct LanguageOptionRow: View {
	let language: String
	let flag: String
	let code: String
	let isSelected: Bool

	var body: some View {
		HStack(spacing: 16) {
			Text(flag)
				.font(.system(size: 32))

			VStack(alignment: .leading, spacing: 2) {
				Text(language)
					.font(.body)
					.fontWeight(isSelected ? .semibold : .regular)

				Text(code.uppercased())
					.font(.caption2)
					.foregroundColor(.secondary)
			}

			Spacer()

			if isSelected {
				Image(systemName: "checkmark.circle.fill")
					.foregroundColor(.blue)
					.font(.title3)
			}
		}
		.padding(.vertical, 8)
		.padding(.horizontal, 8)
		.background(Color.clear)
		.cornerRadius(8)
	}
}
