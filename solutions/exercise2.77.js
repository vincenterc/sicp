// magnitude(z)
// == apply_generic("magnitude", list(z))
// == magnitude(list(z_without_complex_tag))
// == apply_generic("magnitude", list(z_without_complex_tag))
// == magnitude(z_without_complex_rectangular_tag)
// == math_sqrt(square(real_part(z_without_complex_rectangular_tag))
//            + square(image_part(z_without_complex_rectangular_tag)))
// == 5

// z
// == pair("complex", pair("rectangular", pair(3, 4)))
// z_without_complex_tag
// == pair("rectangular", pair(3, 4))
// z_without_complex_rectangular_ta
// == pair(3, 4)
