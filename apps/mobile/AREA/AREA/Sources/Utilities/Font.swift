//
//  Font.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 25/11/2025.
//

import Foundation
import SwiftUI

extension Font {
	static let defaultFont = Font.system(
		size: 16,
		weight: .regular,
		design: .default
	)
	static let titleFont = Font.largeTitle.bold()
}
