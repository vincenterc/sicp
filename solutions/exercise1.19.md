$T_{pq}$ transforms the pair $(a, b)$ according to

$$
\begin{aligned}
a &= bq + aq + ap\\
b &= bp + aq
\end{aligned}
$$

, so

$$
T_{pq} =
\begin{bmatrix}
p+q & q \\
q   & p
\end{bmatrix}
$$

and

$$
\begin{aligned}
T_{pq}^2 &=
\begin{bmatrix}
p^2 + 2q^2 + 2pq & q^2+2pq \\
q^2+2pq          & p^2+q^2
\end{bmatrix} \\
&=
\begin{bmatrix}
(p^2+q^2) + (q^2+2pq) & q^2+2pq \\
q^2+2pq               & p^2+q^2
\end{bmatrix}.
\end{aligned}
$$

If $T_{p'q'} = T_{pq}^2$, we get $p' = p^2 + q^2$ and $q' = q^2 + 2pq$.

Then

```
function fib(n) {
    return fib_iter(1, 0, 0, 1, n);
}

function fib_iter(a, b, p, q, count) {
    return count === 0
           ? b
           : is_even(count)
           ? fib_iter(a,
                      b,
                      p * p + q * q,
                      q * q + 2 * p * q,
                      count / 2)
           : fib_iter(b * q + a * q + a * p,
                      b * p + a * q,
                      p,
                      q,
                      count - 1);
}
```
