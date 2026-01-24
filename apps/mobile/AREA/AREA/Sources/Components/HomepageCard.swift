//
//  HomepageCard.swift
//  AREA
//
//  Created by Arthur GUERINAULT on 11/01/2026.
//

import SwiftUI

struct HomepageCard: Identifiable {
	let id = UUID()
	let title: String
	let iconName: String
	let iconColor: Color
	let backgroundColor: Color
	let number: Int
}
