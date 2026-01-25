//
//  UpdateColorSchemeView.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 18/01/2026.
//

import SimpleKeychain
import SwiftUI

struct UpdateThemeView: View {
	@AppStorage("isDarkMode") private var theme = false
	@State private var previousTheme = false

	var body: some View {
		List {
			Section {
				ThemeOptionRow(
					theme: String(localized: LocalizedStringResource.settingsThemeDark),
					icon: Constants.iconDark,
					code: true,
					isSelected: theme == true
				)
				.contentShape(Rectangle())
				.onTapGesture {
					selectTheme(true)
				}

				ThemeOptionRow(
					theme: String(localized: LocalizedStringResource.settingsThemeLight),
					icon: Constants.iconLight,
					code: false,
					isSelected: theme == false
				)
				.contentShape(Rectangle())
				.onTapGesture {
					selectTheme(false)
				}
			} header: {
				Text(LocalizedStringResource.settingsThemeTitle)
			}
		}
		.navigationTitle(LocalizedStringResource.settingsLanguageLanguageSettings)
		.navigationBarTitleDisplayMode(.inline)
		.onAppear {
			previousTheme = theme
		}
	}

	private func selectTheme(_ code: Bool) {
		guard code != theme else { return }
		previousTheme = theme
		theme = code
	}
}

struct ThemeOptionRow: View {
	let theme: String
	let icon: String
	let code: Bool
	let isSelected: Bool

	var body: some View {
		HStack(spacing: 16) {
			Text(icon)
				.font(.system(size: 32))

			VStack(alignment: .leading, spacing: 2) {
				Text(theme)
					.font(.body)
					.fontWeight(isSelected ? .semibold : .regular)
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
		.accessibilityElement(children: .combine)
		.accessibilityLabel(Text(theme))
		.accessibilityAddTraits(
			isSelected ? [.isButton, .isSelected] : [.isButton]
		)
		.cornerRadius(8)
	}
}
