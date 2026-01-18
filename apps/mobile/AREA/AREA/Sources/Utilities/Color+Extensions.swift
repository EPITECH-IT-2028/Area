//
//  Color+Extensions.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 16/01/2026.
//

import Foundation
import SwiftUI
import UIKit

extension Color {
	static let backgroundColor = Color(
		UIColor { traitCollection in
			if traitCollection.userInterfaceStyle == .dark {
				return UIColor.systemBackground
			} else {
				return UIColor(red: 0.96, green: 0.96, blue: 0.95, alpha: 1)
			}
		}
	)

	static let mainColor = Color(red: 1, green: 0.74, blue: 0.64)

	static let cardBackgroundColor = Color(
		UIColor { traitCollection in
			if traitCollection.userInterfaceStyle == .dark {
				return UIColor.secondarySystemBackground
			} else {
				return UIColor.white
			}
		}
	)
}
